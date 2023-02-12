import User from "../modal/User.js";
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'


export const noofusers = async (request, response) => {
    try {
        const user = await User.find({});
        const maleuser = await User.find({ gender: 'male' });
        const femaleuser = await User.find({ gender: 'female' });
        const ans = { totalusers: user.length, maleusers: maleuser.length, femaleusers: femaleuser.length };
        response.status(200).json(ans);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getUsers = async (request, response) => {
    try {
        const user = await User.find({});
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
}



export const getsubcategory = async (request, response) => {
    try {
        const age = request.params.age;
        const gender = request.params.gender;
        const token = request.params.currGender;
        const religion = request.params.religion;
        const user = await User.findOne({ token: token });
        const currGender = user.gender;
        if (age === '1' && gender === 'gender' && religion === 'religion') {
            const saveGender = currGender === 'male' ? 'female' : 'male';
            const users = await User.find({ gender: saveGender });
            return response.status(200).json(users)

        }

        if (age !== '1' && gender !== 'gender' && religion !== 'religion') {
            var users = await User.find({ age: { $lte: age }, gender: gender, religion: religion });
            return response.status(200).json(users)

        }
        if (age !== '1' && gender !== 'gender' && religion === 'religion') {
            var users = await User.find({ age: { $lte: age }, gender: gender });
            return response.status(200).json(users)

        }
        if (age !== '1' && gender === 'gender' && religion !== 'religion') {
            var users = await User.find({ age: { $lte: age }, religion: religion });
            return response.status(200).json(users)

        }
        if (age === '1' && gender !== 'gender' && religion !== 'religion') {
            var users = await User.find({ gender: gender, religion: religion });
            return response.status(200).json(users)

        }
        if (age !== '1' && gender === 'gender' && religion === 'religion') {
            var users = await User.find({ age: { $lte: age } });
            return response.status(200).json(users)

        }
        if (age === '1' && gender !== 'gender' && religion === 'religion') {
            var users = await User.find({ gender: gender });
            return response.status(200).json(users)

        }
        if (age === '1' && gender === 'gender' && religion !== 'religion') {
            var users = await User.find({ religion: religion });
            return response.status(200).json(users)

        }







    } catch (error) {
        response.status(500).json(error);
    }
}
export const finduser = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ token: token });
        res.status(200).json(user);
    } catch (error) {

        res.status(500).json(error);
    }
}
export const updateuser = async (request, response) => {
    try {

        if (request.body.image == null) {
            console.log('hello')

            if (!request.body.age || !request.body.religion || !request.body.phone || !request.body.gender || !request.body.description) {
                response.status(400).json('not data filling')
                return;
            }
            cloudinary.v2.uploader.upload(request.files.image.tempFilePath, async (err, result) => {
                const finduser = await User.findOne({ email: request.params.id });
                if (finduser) {
                    await finduser.commitchanges(request.body.age, request.body.religion, request.body.gender, result.url, request.body.phone, request.body.description, request.body.salary);
                    await finduser.save();
                    response.status(200).json("updated");
                }
            })
        } else {

            if (!request.body.age || !request.body.religion || !request.body.phone || !request.body.gender || !request.body.description) {
                response.status(400).json('not data filling')
                return;
            }

            const finduser = await User.findOne({ email: request.params.id });
            if (finduser) {
                await finduser.commitchanges(request.body.age, request.body.religion, request.body.gender, request.body.image, request.body.phone, request.body.description, request.body.salary);
                await finduser.save();
                response.status(200).json("updated");
            }


        }






    } catch (error) {
        console.log(error)
    }
}

export const blockuser = async (request, response) => {
    try {



        const finduser = await User.findOne({ email: request.params.id });
        if (finduser) {
            if(finduser.block==1)
            {
                await finduser.blockuserchanges(0);
            }else
            {
                await finduser.blockuserchanges(1);
            }
           
            await finduser.save();
            response.status(200).json("updated");
        }
    } catch (error) {
        console.log(error)
    }
}


export const register = async (req, res) => {
    var { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ error: "please fill this field correctly" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        }
        else {
            password = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password });

            await user.save();

            res.status(201).json({ message: "user registered successfully" });
        }

    } catch (err) {
        console.log(err);
    }

}

export const signin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "plz fill the data" })
            return;
        }

        const userLogin = await User.findOne({ email: email });
        console.log(userLogin)

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            if (!isMatch) {
                res.status(400).json({ error: "user error" });
            } else {
                res.status(200).json({ token: token })

            }
        } else {
            return res.status(400).json({ message: "invalid credentials" });
        }
    } catch (err) {
        console.log(err);

    }

}
