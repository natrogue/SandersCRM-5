// sendEmail.js

require('dotenv').config();


const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


function sendThankYouEmail(donorName, recipientEmail) {
    const message = {
        to: recipientEmail,
        from: process.env.SENDGRID_FROM_EMAIL, // Dirección del remitente
        subject: 'Gracias por tu donación',
        text: `Estimado/a ${donorName},\n\nGracias por tu donación. ¡Apreciamos tu apoyo!\n\nAtentamente,\nEquipo de Fundación Sanders`
    };

    sgMail
        .send(message)
        .then(() => console.log('Correo enviado.'))
        .catch((error) => console.error('Error enviando el correo:', error.message));
}

module.exports = { sendThankYouEmail };
