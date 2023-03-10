var compile = require('es6-template-strings');
const fs = require('fs/promises');
const path = require('path');

type ICompileHTML = {
  status: boolean,
  message?: string,
  data?: string
}

class Template {
  /**
   * compile HTML template
   */
  public async compile(templateName: string, data: object): Promise<ICompileHTML> {
    // let response: ICompileHTML = { status: false };

    // get the template by name
    const templateDir = path.join(__dirname, '../../../src/controllers/templates');
    const fileName = `${templateName}.html`;

    try {
      const files = await fs.readdir(templateDir);

      for await (const file of files) {
        if (path.basename(file) === fileName) {
          const template = await fs.readFile(path.join(templateDir, file), 'utf8')
          return { status: true, data: compile(template, data) }
        } else {
          return { status: false, message: "Template not found!" }
        }
      }
    } catch (error: any) {
      return { status: false, message: error.message }
    }

    return { status: false, message: "Something went wrong!" }
  }
}

export default new Template();
