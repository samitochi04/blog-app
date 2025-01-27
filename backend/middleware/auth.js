const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log('Headers reçus:', req.headers);
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            console.log('Pas d\'en-tête d\'autorisation');
            return res.status(401).json({ message: 'En-tête d\'autorisation manquant' });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token reçu:', token);

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token décodé:', decodedToken);

        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        res.status(401).json({ message: 'Authentification requise', error: error.message });
    }
}; 