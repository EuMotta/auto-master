import { getSession } from 'next-auth/react';
import Car from '../../../../models/Car';
import db from '../../../../utils/db';

const handler = async (req, res) => {
    const session = await getSession({req});
    if(!session) {
        return res.status(401).send({message: "Acesse a sua conta"});
    }
    await db.connect();
    const car = await Car.findById(req.params.id);
    await db.disconnect();
    res.send({ car });
};

export default handler;