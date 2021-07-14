import { Request, Response } from 'express';
import statusCode from '../module/statusCode';
import { readUser, deleteUser, updateUserEmail, readMySongs, createMySong, deleteMySong, createMyVocab, deleteMyVocab } from '../service/user';
import User from '../models/user'

const getUser = async (req: Request, res: Response) => {
  // 토큰으로 대체
  const { userId } = req.body;
  console.log(userId);
  try {
    const readUserRes = await readUser(userId);
    if (!readUserRes){
      return res.json({
        status: statusCode.BAD_REQUEST,
        message: '유효하지 않은 아이디'
      })
    }
    return res.json({
      status: statusCode.OK,
      data: readUserRes,
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

const removeUser = async (req: Request, res: Response) => {
  // 토큰으로 대체
  const { userId } = req.body;
  console.log(userId);
  try {
    const deleteUserRes = await deleteUser(userId);
    if (!deleteUserRes){
      return res.json({
        status: statusCode.BAD_REQUEST,
        message: '유효하지 않은 아이디'
      })
    }
    return res.json({
      status: statusCode.OK,
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

const modifyUserEmail = async (req: Request, res: Response) => {
  // 토큰으로 대체
  const { userId, email } = req.body;
  try {
    const updateUserEmailRes = await updateUserEmail(userId, email);
    if (updateUserEmailRes instanceof Error) throw updateUserEmailRes   
    return res.json({
      status: statusCode.OK,
      data: {
        name: updateUserEmailRes.name,
        email: updateUserEmailRes.email,
        updatedAt: updateUserEmailRes.updatedAt
      },
      message: '수정 성공',
    });
  } catch (error) {
    console.error(error);
    if (error.message === '유효하지 않은 아이디') {
      return res.json({
        status: statusCode.BAD_REQUEST,
        message: '유효하지 않은 아이디'
      })
    }
    return res.json({
      status: statusCode.INTERNAL_SERVER_ERROR,
      message: '서버 내부 오류',
    });
  }
};

const getMySongs = async (req: Request, res: Response) => {
  // 토큰으로 대체
  const { userId } = req.body;
  try {
    const readMySongsRes = await readMySongs(userId);
    if (!readMySongsRes){
      return res.json({
        status: statusCode.BAD_REQUEST,
        message: '유효하지 않은 아이디'
      })
    }
    return res.json({
      status: statusCode.OK,
      data: readMySongsRes,
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

const postMySong = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!id || !userId) {
    return res.json({
      status: statusCode.BAD_REQUEST,
      message: '필요한 값이 없습니다.',
    });
  }
  try {
    await createMySong(+id, userId); // createMySong이 실패하면 에러를 던지게 한다.
    return res.json({
      status: statusCode.OK,
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

const removeMySong = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!id || !userId) {
    return res.json({
      status: statusCode.BAD_REQUEST,
      message: '필요한 값이 없습니다.',
    });
  }
  try {
    await deleteMySong(+id, userId);
    return res.json({
      status: statusCode.OK,
      message: '삭제 성공',
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: statusCode.INTERNAL_SERVER_ERROR,
      message: '서버 내부 에러',
    });
  }
};

const postMyVocab = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;
    if (!id || !userId) {
      return res.json({
        status: statusCode.BAD_REQUEST,
        message: '필요한 값이 없습니다.',
      });
    }
    try {
      await createMyVocab(+id, userId);
      return res.json({
        status: statusCode.OK,
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
  
  const removeMyVocab = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;
    if (!id || !userId) {
      return res.json({
        status: statusCode.BAD_REQUEST,
        message: '필요한 값이 없습니다.',
      });
    }
    try {
      await deleteMyVocab(+id, userId);
      return res.json({
        status: statusCode.OK,
        message: '삭제 성공',
      });
    } catch (error) {
      console.error(error);
      return res.json({
        status: statusCode.INTERNAL_SERVER_ERROR,
        message: '서버 내부 에러',
      });
    }
  };

export { getUser, removeUser, modifyUserEmail, getMySongs, postMySong, removeMySong, postMyVocab, removeMyVocab };
