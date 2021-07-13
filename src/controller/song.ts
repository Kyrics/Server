import { Request, Response } from 'express';
import statusCode from '../module/statusCode';
import { readSong, readVocabs } from '../service/song';

const getSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(id);
    // user Id 토큰 확인 필요
    // 
    try {
      const readSongRes = await readSong(+id, userId);
      return res.json({
        status: statusCode.OK,
        data: readSongRes,
        message: '요청 성공',
      });
    } catch (error) {
      console.error(error);
      return res.json({
        status: statusCode.INTERNAL_SERVER_ERROR,
        message: '서버 내부 오류',
      });
    }
  };

  const getVocabsInSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;
    
    try {
      const readVocabRes = await readVocabs(+id, userId);
      return res.json({
        status: statusCode.OK,
        data: readVocabRes,
        message: '요청 성공',
      });
    } catch (error) {
      console.error(error);
      return res.json({
        status: statusCode.INTERNAL_SERVER_ERROR,
        message: '서버 내부 오류',
      });
    }
  };

export {getSong, getVocabsInSong};