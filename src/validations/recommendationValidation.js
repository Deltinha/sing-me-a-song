import Joi from 'joi';

export default function validateRecommendationSyntax(obj) {
  const ytLinkPattern =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

  const schema = Joi.object({
    name: Joi.string().required(),
    youtubeLink: Joi.string().pattern(ytLinkPattern).required(),
  });

  const validation = schema.validate(obj);
  return !validation.error;
}
