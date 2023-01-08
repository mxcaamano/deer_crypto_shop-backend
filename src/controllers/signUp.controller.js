const logger = require('../utils/logger');
const businessUsers = require('../business/businessUsers');
const { createHash } = require('../utils/bcrypt.config');
const Resize = require('../utils/resize');
const getAge = require('../utils/getAge');
const { mail, transporter } = require('../utils/nodemailer.config')

const getSignUp = (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  res.render('pages/signUp');
};

const getFailsignUp = (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`);
  res.render('pages/signUpError')
}

const postsignUp = async (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`);
    const { email, password, name, address, age, phone } = req.body;
    let emptyProp
    for(var key in req.body) {
      if(req.body[key] === "" && key !== 'imgURL') {
         emptyProp = true
      }
    }
    if (!req.file || emptyProp) {
      res.render('pages/systemMessage', { 
        message: !req.file 
        ? 'Por favor seleccione una imagen' 
        : 'Por favor, complete los campos correctamente' , 
        success: false, 
        href: `signUp` });
      }
      else{
        try {
          const imagePath = './public/uploads/avatars'
          const fileUpload = new Resize(imagePath);
          const filename = await fileUpload.save(req.file.buffer);
          const userFields = { email, password: createHash(password), name, address, age: getAge(age), phone, imgURL: imagePath.slice(8) + '/' + filename, isAdmin: false };
          const user = await businessUsers.save(userFields);
          const mailOptions =  {
            from: `${user.email}`,
            to: mail,
            subject: `Nuevo registro`,
            html: `<div style="background-color:black;"><br>
                    <h1 style="color: #2bf8bb;">&nbsp&nbsp&nbsp Nuevo Registro!</h1><br>
                    <h2 style="color: #2bf8bb;">&nbsp&nbsp&nbspSe ha registrado un nuevo usuario con los siguientes datos:</h2><br>
                    <ul>
                    <li style="color: #4eaa93;">ID: ${user.id}</li>
                    <li style="color: #4eaa93;">Nombre: ${user.name}</li>
                    <li style="color: #4eaa93;">Correo Electrónico: ${user.email}</li>
                    <li style="color: #4eaa93;">Dirección: ${user.address}</li>
                    <li style="color: #4eaa93;">Edad: ${user.age}</li>
                    <li style="color: #4eaa93;">Teléfono: ${user.phone}</li><br>
                    </ul><br>
                    </div><br>`
                  }
          await transporter.sendMail(mailOptions)
          res.redirect('/login');
        } catch (err) {
        res.status(400).json({ message: err.message });
        }
      }
}

module.exports = { getSignUp, getFailsignUp, postsignUp };