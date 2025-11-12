import Files from "../model/files.model.js";
import cloudinary from "../config/cloud.js";



export const addFile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {title, desc, subject} = req.body;

        if (!title || !desc || !subject) {
            return res.status(400).json({message: "All fields are required"})
        }

        let filesUrl = undefined;
        
        if(req.file){
    try 
        {
        const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        
        // Uploading to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(base64File, {
            folder : "files",
            resource_type: 'auto' // for all file types
        })
        
        filesUrl = uploadResult.secure_url 
        
    } catch (error) {
        res.status(500).json({message:"File upload error"}); 
        console.error(error); 
    }
}
        
        const newFile = await Files.create({
            title, desc, filesUrl, subject,  
            createdBy: userId
        })
        res.status(201).json({
            success: true,
            message: "File uploaded",
            newFile,
            })

    } catch (error) {
        res.status(500).json({message:"Error in file uploading function"});
        console.log(error);
    }
}


export const getAllFiles = async (req,res) => {
    try {
        const files = await Files.find();
        res.status(200).json({
            success: true,
            files
        })
    } catch (error) {
        res.status(500).json({message: "Error in fetching all files function"});
    }
}




export const getFilesById = async (req,res) => {
    try {
        const { id } = req.params;
        const files = await Files.findById(id);

        if(!files)
        {
            return res.status(404).json({
                message: "File not found"
            });
        }

        res.status(200).json({
            success: true,
            files
        })
    } catch (error) {
        res.status(500).json({message: "error in fetching file by id function"});
    }
}