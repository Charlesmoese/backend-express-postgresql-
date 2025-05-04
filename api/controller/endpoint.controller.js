const securedEndpoint = async (req, res) => {
    console.log("Something that needs authentication was run here");
    return res.status(200).json({ message: 'This is a secured process' });
}

export default { securedEndpoint};