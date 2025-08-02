export const receiveText=async(req,res)=>{
    try{
        const {selectedText}=req.body;
        if(!selectedText || selectedText.trim().length===0)
        {
            return res.status(400).json({error: "No text selected"});
        }
            const wordCount=selectedText.trim().split(/\s+/).length;
            console.log(`Received text: ${selectedText}`);
            console.log(`Word count: ${wordCount}`);
            return res.status(200).json({
                message :"Text received successfully",
                wordCount: wordCount,
            });
        
    }
    catch(error)
    {
        console.error('Error processing text:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}