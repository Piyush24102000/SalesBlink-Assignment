require('dotenv').config()
var nodemailer = require('nodemailer');

const sendMail = async (emailContent, recipients) => {
    recipients = recipients.split(',')
    console.log("SendMail triggerd")
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'piyush20001024@gmail.com',
                pass: process.env.MAIL_PASS
            }
        });

        var mailOptions = {
            from: 'piyush20001024@gmail.com',
            to: recipients,
            subject: 'SalesBlink Offer',
            text: emailContent
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error.message)
    }
}

const execution = async (req, res) => {
    try {
        let { nodes, executionSequence } = req.body;

        if (executionSequence.length === 1 && executionSequence[0] === null) {
            // If executionSequence contains only one element which is null, execute the only node
            for (let i = 0; i < nodes.length; i++) {
                let label = nodes[i].data.label.toLowerCase().trim()
                if (label === "send email") {
                    console.log("Send Email reached");
                    await sendMail(nodes[i].data.emailContent, nodes[i].data.recipients);
                }
                if (label === "wait") {
                    const durationInMinutes = parseInt(nodes[i].data.duration); // Assuming duration is provided in minutes
                    await new Promise(resolve => setTimeout(resolve, durationInMinutes * 60 * 1000));
                    console.log(`Waitng for ${durationInMinutes}`);
                }
                if(label === 'decision'){
                    console.log(nodes[i].data.condition)
                }
            }
        } 
        else {
            // If executionSequence contains multiple nodes, iterate through them
            console.log(nodes,executionSequence)
            for (let i = 0; i < executionSequence.length; i++) {
                for (let j = 0; j < nodes.length; j++) {
                    if (nodes[j].id == executionSequence[i]) {
                        let label = nodes[j].data.label.toLowerCase().trim()
                        console.log(label)
                        if (label === "send email") {
                            console.log("Send Email reached");
                            await sendMail(nodes[j].data.emailContent, nodes[j].data.recipients);
                        }
                        if (label === "wait") {
                            const durationInMinutes = parseInt(nodes[j].data.duration); // Assuming duration is provided in minutes
                            console.log(`Waiting for ${durationInMinutes} minutes`);
                            await new Promise(resolve => setTimeout(resolve, durationInMinutes * 60 * 1000));
                        }
                        if(label === 'decision'){
                            console.log(nodes[j].data.condition)
                        }
                    }
                }
            }
        }

        return res.status(200).json({ message: "Execution done! ", success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { sendMail, execution }