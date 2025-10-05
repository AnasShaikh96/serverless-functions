
module.exports = {
    helloDynamic: async (res) => {
        res.status(200).json({
            message: 'Hello dynamic func non zip'
        })

        res.end()
    }
}