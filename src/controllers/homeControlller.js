const getHomepage = (req, res) => {
    res.render('index.ejs')
}
const getExample = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomepage, getExample
}