import cron from 'node-cron';
import Reminder from '../models/Reminder.js';

// Define the cron job to run every day at 9:00 AM
// "0 9 * * *" represents "At 09:00"
const startReminderJob = () => {
    cron.schedule('0 9 * * *', async () => {
        console.log('Running daily refill reminder check...');
        try {
            const today = new Date();
            // Start of day today
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            // End of day today
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));

            // Find reminders scheduled for today that haven't been sent yet
            const dueReminders = await Reminder.find({
                remindAt: { $gte: startOfDay, $lte: endOfDay },
                isSent: false
            }).populate('product');

            if (dueReminders.length === 0) {
                console.log('No reminders due for today.');
                return;
            }

            for (const reminder of dueReminders) {
                // In a real application, here you would integrate with an email provider
                // like SendGrid, AWS SES, or an SMS service like Twilio.
                // Example:
                // await sendEmail(reminder.user, "Time to replenish your ritual", `Your ${reminder.productName} is almost empty!`);

                console.log(`[BEAUTY CONCIERGE] Sending friendly reminder to ${reminder.user}: "Your ${reminder.productName} is almost empty. Allow us to restock your ritual 5 days before it runs out."`);

                // Mark as sent
                reminder.isSent = true;
                await reminder.save();
            }

            console.log(`Processed ${dueReminders.length} refill reminders today.`);
        } catch (error) {
            console.error('Error processing refill reminders:', error.message);
        }
    });

    console.log('Premium Beauty Concierge Reminder Job scheduled.');
};

export default startReminderJob;
