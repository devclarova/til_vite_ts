import { supabase } from '../lib/supabase';
import type { Memo, MemoInsert, MemoUpdate } from '../types/MemoType';

// Memo 목록 조회
export const getMemos = async (): Promise<Memo[]> => {
  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(`getMemos 오류: ${error.message}`);
  }
  return data || [];
};

// Memo 목록 조회(id) 이용
export const getMemoById = async (id: number): Promise<Memo | null> => {
  try {
    const { data, error } = await supabase.from('memos').select('*').eq('id', id).single();
    if (error) {
      throw new Error(`getMemoById 오류: ${error.message}`);
    }
    return data;
  } catch (err) {
    console.log('getTodoById 에러: ', err);
    return null;
  }
};

// Memo 생성
export const createMemo = async (newMemo: Omit<MemoInsert, 'user_id'>): Promise<Memo | null> => {
  try {
    // 현재 로그인한 사용자 정보 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }
    const { data, error } = await supabase
      .from('memos')
      .insert([{ ...newMemo, completed: false, user_id: user.id }])
      .select()
      .single();
    if (error) {
      throw new Error(`createMemo 오류: ${error.message}`);
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Memo 수정
export const updateMemo = async (
  id: number,
  editTitle: Omit<MemoUpdate, 'user_id'>,
): Promise<Memo | null> => {
  try {
    const { data, error } = await supabase
      .from('memos')
      .update({ ...editTitle, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`updateMemo 오류: ${error.message}`);
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Memo 삭제
export const deleteMemo = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase.from('memos').delete().eq('id', id);
    if (error) {
      throw new Error(`deleteMemo 오류: ${error.message}`);
    }
  } catch (error) {
    console.log(error);
  }
};
