const createEmailHistory = `
mutation ($email: String, $raw_json: String, $subject: String) {
  insert_emails_histories_one(object: {email: $email, raw_json: $raw_json, subject: $subject}) {
    id
    email
    subject
    sent_at
    raw_json
    created_at
    updated_at
  }
}`;

module.exports = { createEmailHistory }