/**
 * SALUS INITIATIVE — Master Production Apps Script Backend (Code.gs)
 * Version: 5.0 (Full Production Edition: REST API, Base64 Drive Storage, Sheet Repositories)
 */

// ==========================================
// CONFIGURATION & GLOBAL CONSTANTS
// ==========================================
var CONFIG = {
  SHEET_ID: PropertiesService.getScriptProperties().getProperty('SHEET_ID') || '',
  DRIVE_ROOT_FOLDER_NAME: 'Salus_Storage',
  RECAPTCHA_SECRET: PropertiesService.getScriptProperties().getProperty('RECAPTCHA_SECRET') || '6Lf9R2ktAAAAAIsoh_IB42tYRqf3WK7l-lVpUiJg',
  ADMIN_PASSKEY: PropertiesService.getScriptProperties().getProperty('ADMIN_PASSKEY') || 'salus2026',
  ALERT_EMAIL: PropertiesService.getScriptProperties().getProperty('ALERT_EMAIL') || 'example@gmail.com',
};

// ==========================================
// ROUTERS (doGet / doPost)
// ==========================================
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || '';
    var passkey = (e && e.parameter && e.parameter.passkey) || '';
    var response;

    switch (action) {
      case 'getStories':
        response = StoryService.getPublishedStories();
        break;
      case 'getApplicants':
        response = AdminService.getApplicants(passkey);
        break;
      case 'getResources':
        response = ResourceService.getResources();
        break;
      case 'getWhispers':
        response = WhisperService.getWhispers();
        break;
      case 'getFaqs':
        response = FaqService.getFaqs();
        break;
      case 'getTeam':
        response = TeamService.getTeamData();
        break;
      case 'getAdminData':
        response = AdminService.getAdminData(passkey);
        break;
      default:
        response = {
          success: true,
          status: 'HEALTHY',
          service: 'Salus Initiative Production Apps Script Engine v5.0',
          timestamp: new Date().toISOString()
        };
    }

    return createJsonResponse(response);
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString(), timestamp: new Date().toISOString() });
  }
}

function doPost(e) {
  try {
    var postData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (err) {
        postData = {};
      }
    }
    var action = postData.action || '';
    var response;

    if (postData.recaptchaToken && CONFIG.RECAPTCHA_SECRET) {
      var isHuman = verifyRecaptcha(postData.recaptchaToken);
      if (!isHuman) {
        return createJsonResponse({ success: false, error: 'reCAPTCHA verification failed. Suspicious activity blocked.' });
      }
    }

    switch (action) {
      case 'submitStory':
        response = StoryService.createStory(postData);
        break;
      case 'submitApplication':
        response = ApplicationService.createApplication(postData);
        break;
      case 'subscribeNewsletter':
        response = NewsletterService.subscribe(postData);
        break;
      case 'submitContact':
        response = ContactService.createContact(postData);
        break;
      case 'updateStoryStatus':
        response = AdminService.updateStoryStatus(postData.storyId, postData.status, postData.passkey);
        break;
      case 'updateApplicantStatus':
        response = AdminService.updateApplicantStatus(postData.applicantId, postData.status, postData.passkey);
        break;
      case 'deleteApplicant':
        response = AdminService.deleteApplicant(postData.applicantId, postData.passkey);
        break;
      case 'deleteStory':
        response = AdminService.deleteStory(postData.storyId, postData.passkey);
        break;
      case 'updateMainTeamInfo':
        response = TeamService.updateMainTeamInfo(postData);
        break;
      case 'addTeamMember':
        response = TeamService.addTeamMember(postData);
        break;
      case 'deleteTeamMember':
        response = TeamService.deleteTeamMember(postData);
        break;
      case 'saveAllTeamMembers':
        response = TeamService.saveAllTeamMembers(postData);
        break;
      default:
        response = { success: false, error: 'Invalid API Action: ' + action };
    }

    return createJsonResponse(response);
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString(), timestamp: new Date().toISOString() });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function verifyRecaptcha(token) {
  try {
    var url = 'https://www.google.com/recaptcha/api/siteverify';
    var payload = { secret: CONFIG.RECAPTCHA_SECRET, response: token };
    var options = { method: 'post', payload: payload };
    var response = UrlFetchApp.fetch(url, options);
    var result = JSON.parse(response.getContentText());
    return result.success && (result.score === undefined || result.score >= 0.5);
  } catch (e) {
    return true; // Fail open if API call fails
  }
}

// ==========================================
// REPOSITORY LAYER (Data Storage)
// ==========================================
var Repository = {
  getSpreadsheet: function() {
    if (CONFIG.SHEET_ID) {
      try {
        return SpreadsheetApp.openById(CONFIG.SHEET_ID);
      } catch (e) {
        Logger.log('Could not open spreadsheet by ID: ' + e.toString());
      }
    }
    return SpreadsheetApp.getActiveSpreadsheet();
  },

  getSheet: function(sheetName) {
    var ss = this.getSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      initSalusSheets();
    }
    return sheet;
  },

  getData: function(sheetName) {
    var sheet = this.getSheet(sheetName);
    var values = sheet.getDataRange().getValues();
    if (values.length <= 1) return [];
    var headers = values[0];
    var data = [];
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      var obj = {};
      var isEmpty = true;
      for (var j = 0; j < headers.length; j++) {
        var val = row[j];
        if (val !== '' && val !== null && val !== undefined) isEmpty = false;
        obj[headers[j]] = val;
      }
      if (!isEmpty) data.push(obj);
    }
    return data;
  },

  appendRow: function(sheetName, rowArray) {
    var sheet = this.getSheet(sheetName);
    sheet.appendRow(rowArray);
  },

  updateCellByKeyValue: function(sheetName, keyColumnName, keyValue, targetColumnName, newValue) {
    var sheet = this.getSheet(sheetName);
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return false;
    var headers = data[0];
    var keyColIdx = headers.indexOf(keyColumnName);
    var targetColIdx = headers.indexOf(targetColumnName);

    // Fallback case insensitive search
    if (keyColIdx === -1) {
      for (var k = 0; k < headers.length; k++) {
        if (String(headers[k]).toLowerCase() === String(keyColumnName).toLowerCase()) {
          keyColIdx = k;
          break;
        }
      }
    }
    if (targetColIdx === -1) {
      for (var k = 0; k < headers.length; k++) {
        if (String(headers[k]).toLowerCase() === String(targetColumnName).toLowerCase()) {
          targetColIdx = k;
          break;
        }
      }
    }

    if (keyColIdx === -1 || targetColIdx === -1) return false;

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][keyColIdx]).trim() === String(keyValue).trim()) {
        sheet.getRange(i + 1, targetColIdx + 1).setValue(newValue);
        return true;
      }
    }
    return false;
  },

  deleteRowByKeyValue: function(sheetName, keyColumnName, keyValue) {
    var sheet = this.getSheet(sheetName);
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return false;
    var headers = data[0];
    var keyColIdx = headers.indexOf(keyColumnName);
    if (keyColIdx === -1) {
      for (var k = 0; k < headers.length; k++) {
        if (String(headers[k]).toLowerCase() === String(keyColumnName).toLowerCase()) {
          keyColIdx = k;
          break;
        }
      }
    }
    if (keyColIdx === -1) return false;

    for (var i = data.length - 1; i >= 1; i--) {
      if (String(data[i][keyColIdx]).trim() === String(keyValue).trim()) {
        sheet.deleteRow(i + 1);
        return true;
      }
    }
    return false;
  }
};

// ==========================================
// DRIVE FILE ENGINE
// ==========================================
var DriveService = {
  getOrCreateFolder: function(folderName) {
    var folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) return folders.next();
    return DriveApp.createFolder(folderName);
  },

  uploadBase64File: function(base64Data, fileName, mimeType) {
    try {
      if (!base64Data) return '';
      // Strip data URI scheme header if present (e.g. data:application/pdf;base64,...)
      var cleanBase64 = base64Data;
      if (cleanBase64.indexOf('base64,') !== -1) {
        cleanBase64 = cleanBase64.split('base64,')[1];
      }

      var folder = this.getOrCreateFolder(CONFIG.DRIVE_ROOT_FOLDER_NAME);
      var bytes = Utilities.base64Decode(cleanBase64);
      var fileBlob = Utilities.newBlob(bytes, mimeType || 'application/pdf', fileName || 'Uploaded_Document');
      var file = folder.createFile(fileBlob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      return file.getUrl();
    } catch (e) {
      Logger.log('Drive Upload Failed: ' + e.toString());
      return '';
    }
  }
};

// ==========================================
// SERVICES LAYER
// ==========================================
var StoryService = {
  getPublishedStories: function() {
    var raw = Repository.getData('Stories');
    var published = raw.filter(function(item) {
      return item.Status === 'Approved' || item.status === 'Approved';
    });
    return { success: true, data: published, timestamp: new Date().toISOString() };
  },

  createStory: function(data) {
    var storyId = 'st-' + Date.now().toString().slice(-6);
    var timestamp = new Date().toISOString();
    var imageUrl = '';

    if (data.imageBase64 && data.imageFileName) {
      imageUrl = DriveService.uploadBase64File(data.imageBase64, data.imageFileName, 'image/jpeg');
    }

    var excerpt = sanitizeInput(data.content || '').substring(0, 140) + '...';

    Repository.appendRow('Stories', [
      storyId, timestamp, sanitizeInput(data.title || 'Untitled Story'),
      sanitizeInput(data.category || 'Student Voice'),
      sanitizeInput(data.authorName || 'Anonymous'),
      data.isAnonymous ? '' : sanitizeInput(data.authorEmail || ''),
      data.isAnonymous ? 'TRUE' : 'FALSE', sanitizeInput(data.content || ''),
      excerpt, imageUrl, 'Pending', 'FALSE', timestamp, 0
    ]);

    if (data.authorEmail && !data.isAnonymous) {
      EmailService.sendStoryReceivedEmail(data.authorEmail, data.title);
    }

    return { success: true, message: 'Story submitted for peer moderation.', storyId: storyId, id: storyId, timestamp: timestamp };
  }
};

var ApplicationService = {
  createApplication: function(data) {
    var appId = 'APP-' + Date.now().toString().slice(-4);
    var timestamp = new Date().toISOString();
    var resumeUrl = data.resumeUrl || data.resumeDriveUrl || '';

    // Handle CV / Resume file upload (checks both cvBase64 and resumeBase64)
    var base64Data = data.cvBase64 || data.resumeBase64 || '';
    var fileName = data.cvFileName || data.resumeFileName || ('Resume_' + appId + '.pdf');
    var mimeType = data.mimeType || 'application/pdf';

    if (base64Data) {
      var uploadedUrl = DriveService.uploadBase64File(base64Data, fileName, mimeType);
      if (uploadedUrl) {
        resumeUrl = uploadedUrl;
      }
    }

    var roleTrack = data.roleTrack || data.selectedTeam || data.roleInterest || 'Design';

    Repository.appendRow('Applicants', [
      appId, timestamp, sanitizeInput(data.fullName || data.name || ''),
      sanitizeInput(data.email || ''), sanitizeInput(data.phoneNumber || data.phone || ''),
      sanitizeInput(data.schoolCollege || data.schoolOrOrg || ''),
      sanitizeInput(data.grade || data.gradeOrTitle || ''),
      sanitizeInput(data.instagramId || ''), roleTrack,
      sanitizeInput(data.primarySkill || data.relevantSkills || ''),
      sanitizeInput(data.preferredWorkStyle || ''), sanitizeInput(data.pastExperience || ''),
      sanitizeInput(data.comfortSensitiveTopics || ''), resumeUrl,
      sanitizeInput(data.whyThisTeam || data.statementOfIntent || data.motivationStatement || ''),
      'Submitted', 'Pending review'
    ]);

    if (data.email) {
      EmailService.sendApplicationReceivedEmail(data.email, data.fullName || data.name, appId, roleTrack);
    }

    if (CONFIG.ALERT_EMAIL) {
      EmailService.sendNewApplicantAlertEmail(CONFIG.ALERT_EMAIL, data, appId, roleTrack, resumeUrl);
    }

    return { success: true, message: 'Application submitted successfully!', applicationId: appId, id: appId, resumeUrl: resumeUrl, timestamp: timestamp };
  }
};

var NewsletterService = {
  subscribe: function(data) {
    var subId = 'SUB-' + Date.now().toString().slice(-4);
    var timestamp = new Date().toISOString();

    Repository.appendRow('Subscribers', [
      subId, sanitizeInput(data.email || ''), timestamp, data.targetGroup || 'Student', 'Active'
    ]);

    return { success: true, message: 'Subscribed to Salus Whispers!', subscriberId: subId, timestamp: timestamp };
  }
};

var ContactService = {
  createContact: function(data) {
    if (data.email) {
      EmailService.sendContactAcknowledgementEmail(data.email, data.name);
    }
    return { success: true, message: 'Inquiry received. Response within 24 hours.', timestamp: new Date().toISOString() };
  }
};

var WhisperService = {
  getWhispers: function() {
    return { success: true, data: Repository.getData('Whispers'), timestamp: new Date().toISOString() };
  }
};

var ResourceService = {
  getResources: function() {
    return { success: true, data: Repository.getData('Resources'), timestamp: new Date().toISOString() };
  }
};

var FaqService = {
  getFaqs: function() {
    return { success: true, data: Repository.getData('FAQs'), timestamp: new Date().toISOString() };
  }
};

var AdminService = {
  getApplicants: function(passkey) {
    if (CONFIG.ADMIN_PASSKEY && passkey !== CONFIG.ADMIN_PASSKEY) {
      return { success: false, error: 'Unauthorized Access' };
    }
    return { success: true, data: Repository.getData('Applicants'), timestamp: new Date().toISOString() };
  },

  getAdminData: function(passkey) {
    if (CONFIG.ADMIN_PASSKEY && passkey !== CONFIG.ADMIN_PASSKEY) {
      return { success: false, error: 'Unauthorized Administrative Access' };
    }

    return {
      success: true,
      data: {
        stories: Repository.getData('Stories'),
        applicants: Repository.getData('Applicants'),
        subscribers: Repository.getData('Subscribers'),
        logs: Repository.getData('SystemLogs')
      },
      timestamp: new Date().toISOString()
    };
  },

  updateStoryStatus: function(storyId, status, passkey) {
    if (CONFIG.ADMIN_PASSKEY && passkey !== CONFIG.ADMIN_PASSKEY) return { success: false, error: 'Unauthorized' };
    var success = Repository.updateCellByKeyValue('Stories', 'ID', storyId, 'Status', status);
    return { success: success, message: 'Story status updated to ' + status };
  },

  updateApplicantStatus: function(applicantId, status, passkey) {
    if (CONFIG.ADMIN_PASSKEY && passkey !== CONFIG.ADMIN_PASSKEY) return { success: false, error: 'Unauthorized' };
    var success = Repository.updateCellByKeyValue('Applicants', 'ID', applicantId, 'Status', status);
    return { success: success, message: 'Applicant status updated to ' + status };
  },

  deleteApplicant: function(applicantId, passkey) {
    if (CONFIG.ADMIN_PASSKEY && passkey !== CONFIG.ADMIN_PASSKEY) return { success: false, error: 'Unauthorized' };
    var success = Repository.deleteRowByKeyValue('Applicants', 'ID', applicantId);
    return { success: success, message: 'Applicant ' + applicantId + ' deleted from Google Sheet.' };
  },

  deleteStory: function(storyId, passkey) {
    if (CONFIG.ADMIN_PASSKEY && passkey !== CONFIG.ADMIN_PASSKEY) return { success: false, error: 'Unauthorized' };
    var success = Repository.deleteRowByKeyValue('Stories', 'ID', storyId);
    return { success: success, message: 'Story ' + storyId + ' deleted from Google Sheet.' };
  }
};

// ==========================================
// TEAM MANAGEMENT SERVICE
// ==========================================
var TeamService = {
  getTeamData: function() {
    var infoSheet = Repository.getData('MainTeamInfo');
    var members = Repository.getData('Team');
    var mainTeamInfo = (infoSheet && infoSheet.length > 0) ? infoSheet[0] : null;
    return {
      success: true,
      mainTeamInfo: mainTeamInfo,
      members: members || []
    };
  },

  updateMainTeamInfo: function(postData) {
    if (CONFIG.ADMIN_PASSKEY && postData.passkey !== CONFIG.ADMIN_PASSKEY) {
      return { success: false, error: 'Unauthorized passkey' };
    }
    var sheet = Repository.getSheet('MainTeamInfo');
    sheet.clearContents();
    sheet.appendRow(['Title', 'Subtitle', 'MainTeamImageUrl', 'NarrativeText', 'FoundingYear', 'ChapterCount', 'TotalMembersCount']);
    sheet.appendRow([
      postData.title || '',
      postData.subtitle || '',
      postData.mainTeamImageUrl || '',
      postData.narrativeText || '',
      postData.foundingYear || '',
      postData.chapterCount || '',
      postData.totalMembersCount || ''
    ]);
    return { success: true, message: 'Main team info updated' };
  },

  addTeamMember: function(postData) {
    if (CONFIG.ADMIN_PASSKEY && postData.passkey !== CONFIG.ADMIN_PASSKEY) {
      return { success: false, error: 'Unauthorized passkey' };
    }
    var member = postData.member;
    if (!member) return { success: false, error: 'Missing member payload' };
    Repository.appendRow('Team', [
      member.id || ('team-' + new Date().getTime()),
      member.name || '',
      member.role || '',
      member.category || 'Leadership',
      member.bio || '',
      member.imageUrl || '',
      member.quote || '',
      member.linkedinUrl || '',
      member.email || '',
      member.orderIndex || 1
    ]);
    return { success: true, message: 'Team member added' };
  },

  deleteTeamMember: function(postData) {
    if (CONFIG.ADMIN_PASSKEY && postData.passkey !== CONFIG.ADMIN_PASSKEY) {
      return { success: false, error: 'Unauthorized passkey' };
    }
    var memberId = postData.memberId;
    if (!memberId) return { success: false, error: 'Missing memberId' };
    var deleted = Repository.deleteRowByKeyValue('Team', 'ID', memberId);
    return { success: deleted, message: deleted ? 'Member deleted' : 'Member ID not found' };
  },

  saveAllTeamMembers: function(postData) {
    if (CONFIG.ADMIN_PASSKEY && postData.passkey !== CONFIG.ADMIN_PASSKEY) {
      return { success: false, error: 'Unauthorized passkey' };
    }
    var sheet = Repository.getSheet('Team');
    sheet.clearContents();
    sheet.appendRow(['ID', 'Name', 'Role', 'Category', 'Bio', 'ImageUrl', 'Quote', 'LinkedinUrl', 'Email', 'OrderIndex']);
    var members = postData.members || [];
    for (var i = 0; i < members.length; i++) {
      var m = members[i];
      sheet.appendRow([
        m.id || ('team-' + (i + 1)),
        m.name || '',
        m.role || '',
        m.category || 'Leadership',
        m.bio || '',
        m.imageUrl || '',
        m.quote || '',
        m.linkedinUrl || '',
        m.email || '',
        m.orderIndex || (i + 1)
      ]);
    }
    return { success: true, message: 'All team members updated in Google Sheets' };
  }
};

// ==============================================================================
// 200X LUXURY EDITORIAL EMAIL DISPATCHER (Dark RenderVoid Magazine Architecture)
// ==============================================================================
var EmailService = {
  sendHtmlEmail: function(toEmail, subject, htmlBody) {
    try {
      MailApp.sendEmail({
        to: toEmail,
        subject: subject,
        htmlBody: htmlBody,
        name: 'Salus Initiative'
      });
    } catch (e) {
      Logger.log('Email Error: ' + e.toString());
    }
  },

  sendApplicationReceivedEmail: function(toEmail, name, appId, roleTrack) {
    var content =
      "<h2 style='font-family: Georgia, serif; font-size: 26px; color: #F8F7F4; margin: 0 0 12px; font-weight: 700;'>Fellowship Application Received</h2>" +
      "<p style='font-size: 15px; line-height: 1.7; color: #E8E5DF; margin-bottom: 20px;'>Dear <strong>" + escapeHtml(name) + "</strong>,</p>" +
      "<p style='font-size: 15px; line-height: 1.7; color: #E8E5DF; margin-bottom: 24px;'>" +
        "Thank you for applying for the <strong>" + escapeHtml(roleTrack) + " Fellowship Track</strong> at Salus Initiative. Your application reference number is <span style='color: #FF7E67; font-family: monospace; font-weight: bold; background: rgba(255, 126, 103, 0.15); padding: 3px 8px; border-radius: 6px;'>" + appId + "</span>." +
      "</p>" +
      "<div style='background: #1C1E22; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; margin-bottom: 24px; text-align: left;'>" +
        "<h4 style='margin: 0 0 8px; font-size: 13px; font-family: monospace; color: #FF7E67; text-transform: uppercase; letter-spacing: 1px;'>Next Steps</h4>" +
        "<p style='margin: 0; font-size: 14px; color: #96928C; line-height: 1.6;'>" +
          "Our peer selection committee will review your portfolio and statement of intent. You will hear from us via email within 3 to 5 business days." +
        "</p>" +
      "</div>";

    var html = getEmailTemplate(content);
    this.sendHtmlEmail(toEmail, "Fellowship Application Received [" + appId + "] — Salus Initiative", html);
  },

  sendNewApplicantAlertEmail: function(toEmail, data, appId, roleTrack, resumeUrl) {
    var name = data.fullName || data.name || 'Anonymous Applicant';
    var email = data.email || 'N/A';
    var phone = data.phoneNumber || data.phone || 'N/A';
    var school = data.schoolCollege || data.schoolOrOrg || 'N/A';
    var grade = data.grade || data.gradeOrTitle || 'N/A';
    var insta = data.instagramId || 'N/A';
    var skills = data.primarySkill || data.relevantSkills || 'N/A';
    var workStyle = data.preferredWorkStyle || 'N/A';
    var pastExp = data.pastExperience || 'N/A';
    var comfort = data.comfortSensitiveTopics || 'N/A';
    var intent = data.whyThisTeam || data.statementOfIntent || data.motivationStatement || 'N/A';

    var resumeHtml = resumeUrl 
      ? "<a href='" + escapeHtml(resumeUrl) + "' target='_blank' style='display: inline-block; background: #FF7E67; color: #0C0D0E; padding: 10px 20px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 13px;'>Open Uploaded Resume / CV ↗</a>" 
      : "<span style='color: #96928C; font-size: 13px; font-style: italic;'>No resume document attached</span>";

    var content =
      "<div style='display: inline-block; background: rgba(255, 126, 103, 0.15); color: #FF7E67; font-size: 11px; font-family: monospace; font-weight: 700; padding: 4px 12px; border-radius: 9999px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px;'>⚡ New Applicant Notification</div>" +
      "<h2 style='font-family: Georgia, serif; font-size: 24px; color: #F8F7F4; margin: 0 0 12px; font-weight: 700;'>New Candidate Applied</h2>" +
      "<p style='font-size: 15px; line-height: 1.7; color: #E8E5DF; margin-bottom: 24px;'>" +
        "A new applicant, <strong style='color: #FF7E67;'>" + escapeHtml(name) + "</strong>, has just applied for the <strong>" + escapeHtml(roleTrack) + " Track</strong> (Application ID: <span style='color: #FF7E67; font-family: monospace; font-weight: bold; background: rgba(255, 126, 103, 0.15); padding: 2px 6px; border-radius: 4px;'>" + appId + "</span>)." +
      "</p>" +
      "<div style='background: #1C1E22; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; margin-bottom: 20px; text-align: left;'>" +
        "<h4 style='margin: 0 0 14px; font-size: 12px; font-family: monospace; color: #FF7E67; text-transform: uppercase; letter-spacing: 1px;'>Applicant Overview</h4>" +
        "<table width='100%' style='border-collapse: collapse; font-size: 14px; color: #E8E5DF;'>" +
          "<tr><td style='padding: 6px 0; color: #96928C; width: 140px;'>Full Name:</td><td style='padding: 6px 0; font-weight: 600; color: #F8F7F4;'>" + escapeHtml(name) + "</td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>Email:</td><td style='padding: 6px 0;'><a href='mailto:" + escapeHtml(email) + "' style='color: #FF7E67; text-decoration: none;'>" + escapeHtml(email) + "</a></td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>Phone:</td><td style='padding: 6px 0;'>" + escapeHtml(phone) + "</td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>School / Org:</td><td style='padding: 6px 0;'>" + escapeHtml(school) + "</td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>Grade / Year:</td><td style='padding: 6px 0;'>" + escapeHtml(grade) + "</td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>Instagram:</td><td style='padding: 6px 0;'>" + escapeHtml(insta) + "</td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>Applied Track:</td><td style='padding: 6px 0; font-weight: 600; color: #FF7E67;'>" + escapeHtml(roleTrack) + "</td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>Primary Skills:</td><td style='padding: 6px 0;'>" + escapeHtml(skills) + "</td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>Work Style:</td><td style='padding: 6px 0;'>" + escapeHtml(workStyle) + "</td></tr>" +
          "<tr><td style='padding: 6px 0; color: #96928C;'>Sensitive Topics:</td><td style='padding: 6px 0;'>" + escapeHtml(comfort) + "</td></tr>" +
        "</table>" +
      "</div>" +
      "<div style='background: #1C1E22; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; margin-bottom: 20px; text-align: left;'>" +
        "<h4 style='margin: 0 0 8px; font-size: 12px; font-family: monospace; color: #FF7E67; text-transform: uppercase; letter-spacing: 1px;'>Past Experience & Portfolio</h4>" +
        "<p style='margin: 0 0 16px; font-size: 14px; color: #E8E5DF; line-height: 1.6; white-space: pre-wrap;'>" + escapeHtml(pastExp) + "</p>" +
        "<h4 style='margin: 0 0 8px; font-size: 12px; font-family: monospace; color: #FF7E67; text-transform: uppercase; letter-spacing: 1px;'>Statement of Intent / Motivation</h4>" +
        "<p style='margin: 0; font-size: 14px; color: #E8E5DF; line-height: 1.6; white-space: pre-wrap;'>" + escapeHtml(intent) + "</p>" +
      "</div>" +
      "<div style='margin-bottom: 12px; text-align: left;'>" + resumeHtml + "</div>";

    var html = getEmailTemplate(content);
    this.sendHtmlEmail(toEmail, "🚨 New Applicant: " + escapeHtml(name) + " applied for " + escapeHtml(roleTrack) + " [" + appId + "] — Salus Alert", html);
  },

  sendStoryReceivedEmail: function(toEmail, storyTitle) {
    var content =
      "<h2 style='font-family: Georgia, serif; font-size: 26px; color: #F8F7F4; margin: 0 0 12px; font-weight: 700;'>Story Received for Review</h2>" +
      "<p style='font-size: 15px; line-height: 1.7; color: #E8E5DF; margin-bottom: 20px;'>" +
        "Thank you for sharing your reflective story, <em style='color: #FF7E67;'>'" + escapeHtml(storyTitle) + "'</em>, with Salus Initiative." +
      "</p>" +
      "<p style='font-size: 15px; line-height: 1.7; color: #96928C; margin-bottom: 24px;'>" +
        "Every story shared creates a beacon of hope for students navigating silent academic or emotional struggles. Our moderation team reviews every piece with deep care and respect for psychological safety." +
      "</p>";

    var html = getEmailTemplate(content);
    this.sendHtmlEmail(toEmail, "Story Submitted for Peer Review — Salus Initiative", html);
  },

  sendContactAcknowledgementEmail: function(toEmail, name) {
    var content =
      "<h2 style='font-family: Georgia, serif; font-size: 26px; color: #F8F7F4; margin: 0 0 12px; font-weight: 700;'>Message Received</h2>" +
      "<p style='font-size: 15px; line-height: 1.7; color: #E8E5DF; margin-bottom: 20px;'>Hello <strong>" + escapeHtml(name) + "</strong>,</p>" +
      "<p style='font-size: 15px; line-height: 1.7; color: #96928C; margin-bottom: 24px;'>" +
        "Thank you for reaching out to Salus Initiative. A peer council member will review your inquiry and respond within 24 hours." +
      "</p>";

    var html = getEmailTemplate(content);
    this.sendHtmlEmail(toEmail, "We Received Your Message — Salus Initiative", html);
  }
};

function getEmailTemplate(bodyContent) {
  return "<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='margin:0; padding:0; background-color:#0C0D0E; font-family: -apple-system, BlinkMacSystemFont, \"Plus Jakarta Sans\", \"Segoe UI\", Roboto, sans-serif; -webkit-font-smoothing: antialiased;'>" +
    "<table width='100%' border='0' cellspacing='0' cellpadding='0' style='background-color:#0C0D0E; padding: 40px 16px;'>" +
    "<tr><td align='center'>" +
    "<table width='100%' max-width='600' border='0' cellspacing='0' cellpadding='0' style='max-width:600px; background:#141518; border-radius:24px; border:1px solid rgba(255,255,255,0.12); box-shadow: 0 20px 50px rgba(0,0,0,0.8); overflow:hidden;'>" +
    "<!-- HEADER -->" +
    "<tr><td style='padding: 36px 36px 24px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08);'>" +
    "<h1 style='margin:0; font-size:24px; font-family: Georgia, serif; font-weight:700; color:#F8F7F4; letter-spacing:-0.5px;'>SALUS <span style='color:#FF7E67;'>INITIATIVE</span></h1>" +
    "<p style='margin:6px 0 0; font-size:10px; font-family: monospace; color:#96928C; letter-spacing:2.5px; text-transform:uppercase;'>Youth Mental Health & Emotional Well-Being</p>" +
    "</td></tr>" +
    "<!-- BODY -->" +
    "<tr><td style='padding: 36px; text-align: left;'>" + bodyContent + "</td></tr>" +
    "<!-- FOOTER -->" +
    "<tr><td style='padding: 24px 36px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); background: #0C0D0E; color: #96928C; font-size: 11px; line-height: 1.6;'>" +
    "<p style='margin:0 0 6px; color:#E8E5DF;'>© 2026 Salus Initiative • Peer Support & Youth Advocacy</p>" +
    "<p style='margin:0; color:#96928C; font-size:10px;'>Crisis Helplines: KIRAN (1800-599-0019) • Tele-MANAS (14416) • Vandrevala (+91 9999 666 555)</p>" +
    "</td></tr>" +
    "</table>" +
    "</td></tr></table>" +
    "</body></html>";
}

function sanitizeInput(str) {
  return String(str || '').replace(/<[^>]*>?/gm, '');
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ==========================================
// AUTOMATED SHEET INITIALIZATION
// ==========================================
function initSalusSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetsToCreate = [
    {
      name: 'Stories',
      headers: ['ID', 'Timestamp', 'Title', 'Category', 'AuthorName', 'AuthorEmail', 'IsAnonymous', 'Content', 'Excerpt', 'ImageUrl', 'Status', 'Featured', 'PublishedAt', 'Likes'],
      sample: ['st-101', new Date().toISOString(), 'Learning to Breathe Through Senior Year', 'Student Voice', 'Maya Lin', 'maya@example.com', 'FALSE', 'Full story narrative...', 'How a high school senior rediscovered peace...', '', 'Approved', 'TRUE', new Date().toISOString(), 142]
    },
    {
      name: 'Applicants',
      headers: ['ID', 'Timestamp', 'FullName', 'Email', 'PhoneNumber', 'SchoolCollege', 'Grade', 'InstagramId', 'SelectedTeam', 'PrimarySkill', 'WorkStyle', 'PastExperience', 'ComfortSensitiveTopics', 'ResumeUrl', 'WhyThisTeam', 'Status', 'AdminNotes'],
      sample: ['APP-1001', new Date().toISOString(), 'Aarav Sharma', 'aarav@example.com', '+91 98765 43210', 'DPS R.K. Puram', '12th Grade', '@aarav_sharma', 'Design', 'Graphic Design & Zines', 'Remote & Independent', 'Designed school club posts', 'Highly Comfortable', 'https://drive.google.com/', 'Passionate about student mental health graphics', 'Submitted', 'Pending review']
    },
    {
      name: 'Subscribers',
      headers: ['ID', 'Email', 'OptInDate', 'TargetGroup', 'Status'],
      sample: ['SUB-101', 'student@example.com', new Date().toISOString(), 'Student', 'Active']
    },
    {
      name: 'Whispers',
      headers: ['ID', 'Quote', 'Author', 'Category', 'TargetAudience'],
      sample: ['w-1', 'Rest is not a reward for work finished; it is the soil in which your mind recovers its quiet courage.', 'Salus Daily Whisper', 'Self-Compassion', 'Student']
    },
    {
      name: 'Resources',
      headers: ['ID', 'Title', 'Category', 'Description', 'Tags', 'ReadTime', 'IsFeatured', 'DownloadUrl'],
      sample: ['res-1', 'Grounding Techniques for Acute Panic', 'Crisis Support', '5-4-3-2-1 sensory grounding guide for immediate relief.', 'Anxiety, Grounding', '3 min read', 'TRUE', 'https://drive.google.com/...']
    },
    {
      name: 'SystemLogs',
      headers: ['ID', 'Timestamp', 'Level', 'Channel', 'Message'],
      sample: ['LOG-5001', new Date().toISOString(), 'INFO', 'SystemInitializer', 'Salus Sheets schema initialized successfully.']
    },
    {
      name: 'Team',
      headers: ['ID', 'Name', 'Role', 'Category', 'Bio', 'ImageUrl', 'Quote', 'LinkedinUrl', 'Email', 'OrderIndex'],
      sample: ['team-1', 'Aanya Sharma', 'Founder & Executive Director', 'Leadership', 'Passionate about peer advocacy and youth mental health accessibility.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', 'Creating space for vulnerable conversations is the first step toward collective healing.', 'https://linkedin.com', 'aanya@salusinitiative.org', 1]
    },
    {
      name: 'MainTeamInfo',
      headers: ['Title', 'Subtitle', 'MainTeamImageUrl', 'NarrativeText', 'FoundingYear', 'ChapterCount', 'TotalMembersCount'],
      sample: ['The Architects of Emotional Sanctuary', 'A dedicated collective of student advocates, peer counselors, and advisors.', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80', 'Salus Initiative was founded on a singular conviction: that mental health is a shared human journey.', '2024', '18+', '45+']
    }
  ];

  sheetsToCreate.forEach(function(item) {
    var sheet = ss.getSheetByName(item.name);
    if (!sheet) {
      sheet = ss.insertSheet(item.name);
      sheet.appendRow(item.headers);
      if (item.sample) {
        sheet.appendRow(item.sample);
      }
      sheet.getRange(1, 1, 1, item.headers.length).setFontWeight('bold').setBackground('#141518').setFontColor('#F8F7F4');
    }
  });

  Logger.log('Salus Sheets Schema v5.0 Initialized Successfully!');
}
