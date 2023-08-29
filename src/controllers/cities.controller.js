export async function registerCity(req, res) {
    try {
        return res.status(200).send('');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}