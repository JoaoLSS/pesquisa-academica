import {exec} from "child_process";
import {https, Response} from "firebase-functions";

export default (req: https.Request, res: Response): void => {
  exec("npx prisma migrate deploy", (error, stdout) => {
    if (error) res.status(500).send(error.message);
    else res.send(stdout);
  });
};
