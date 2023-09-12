const controllers = {};

controllers.test = (req,res)=>{
    try {
        return res.status(200).json({message: 'Testing API'});
    } catch (error) {
        console.log(error)
    }
}

module.exports = controllers;