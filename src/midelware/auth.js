const auth = async (req, res, next) => {
    const secret = process.env.SECRET;
    console.log("🚀 ~ file: auth.js:3 ~ secret", secret)
    console.log(req.body);
    const {body} =req
    return res.status(200).json({ message: body })
    
};


module.exports= auth