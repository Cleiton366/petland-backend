export const CheckSession = (req, res, next) => {
    try {
        if(req.session.passport.user){
            next();
        }
    } catch (error) {
        return res.json({
            Status: "Error",
            Message: "User not authenticated",
        });
    }
};