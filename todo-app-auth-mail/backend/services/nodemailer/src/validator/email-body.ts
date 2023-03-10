import Joi from 'joi';

const emailBody = Joi.object({
  mailOptions: Joi.object({
    from: Joi.string().required(),
    to: Joi.alternatives().try(
      Joi.array().min(1).items(Joi.alternatives().try(Joi.string(), Joi.object().min(1))),
      Joi.string().required()
    ).required(),
    cc: [
      Joi.array().min(1).items(Joi.alternatives().try(Joi.string(), Joi.object().min(1))),
      Joi.string().required()
    ],
    bcc: [
      Joi.array().min(1).items(Joi.alternatives().try(Joi.string(), Joi.object().min(1))),
      Joi.string().required()
    ],
    subject: Joi.string().required(),
    text: Joi.string(),
    template: Joi.string().required(),
    // html: Joi.alternatives().try(
    //   Joi.string(),
    //   Joi.object({ path: Joi.string().required() }).min(1)
    // ).required(),
    data: Joi.object(),
    attachments: Joi.array().min(1).items(Joi.object().min(1))
  }).required(),
  transportOptions: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    auth: Joi.object({
      user: Joi.string().required(),
      pass: Joi.string().required()
    }).required(),
  }).required()
});

export default emailBody;