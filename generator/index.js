const LP = require('linkedin-public-profile-parser');
const Handlebars = require('handlebars');
const fs = require('fs');
const scrapedin = require('scrapedin')

async function extract(email, password, profileUrl) {
  const profileScraper = await scrapedin({ email, password })
  return await profileScraper('https://www.linkedin.com/in/some-profile/')
};

function writeTemplate(templateFile, profileData) {
  const template = fs.readFileSync(templateFile, 'utf8');
  const compiledTemplate = Handlebars.compile(template);

  return compiledTemplate(profileData);
}

function saveTemplate(fileName, data) {
  fs.writeFileSync(fileName, data)
}

async function experience() {
  try {
    const profile = await extract('imarcelolz@gmail.com', 'iml85linkedin92', 'https://www.linkedin.com/in/imarcelolz/');
    const boundTemplate = writeTemplate('./templates/experience.hbs', profile);
    saveTemplate('test.html', boundTemplate)
  } catch(error) {
    console.error(error);
  }

}

experience();
