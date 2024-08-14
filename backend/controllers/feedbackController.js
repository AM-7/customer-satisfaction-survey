const Feedback = require('../models/Feedback');


const calculateCSI = async (req, res) => {
    

    try {
        const feedbacks = await Feedback.find({});
        

   
        const calculateAverage = (responses) => {
            
            const totalResponses = responses.length;
            const sum = responses.reduce((acc, val) => acc + val, 0);
            return totalResponses ? (sum / totalResponses) : 0;
        };

        
        let productCSI = {};
        let zoneCSI = {};
        let overallResponses = [];

        
        feedbacks.forEach(feedback => {
            const { product, zone, responses } = feedback;
            overallResponses = overallResponses.concat(responses);

            
            if (!productCSI[product]) {
                productCSI[product] = [];
            }
            productCSI[product] = productCSI[product].concat(responses);

            
            if (!zoneCSI[zone]) {
                zoneCSI[zone] = [];
            }
            zoneCSI[zone] = zoneCSI[zone].concat(responses);
        });

        
        for (const product in productCSI) {
            productCSI[product] = calculateAverage(productCSI[product]);
        }
        for (const zone in zoneCSI) {
            zoneCSI[zone] = calculateAverage(zoneCSI[zone]);
        }
        const overallCSI = calculateAverage(overallResponses);

        

        res.status(200).json({
            productCSI,
            zoneCSI,
            overallCSI
        });
    } catch (error) {
        console.error('Error calculating CSI:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { calculateCSI };
