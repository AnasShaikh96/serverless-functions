import type { Response } from "express"
// export async function helloWorld(res: Response) {
//     // console.log('this is hello world executed')
//     res.status(200).json({
//         message: 'Hello world'
//     })
// }

module.exports = {
    helloWorld: async (res: Response) => {
        res.status(200).json({
            message: 'Hello world'
        })

        res.end()
    }
}