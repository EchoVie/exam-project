import request from '@/utils/request';
export interface ItemProps {
  id: number;
  title: string;
  content: string;
  date: number;
}

export const getList = () => {
  return request({
    url: '/list',
    method: 'GET'
  });
};

export const updateList = (data: ItemProps[]) => {
  return request({
    url: '/updateList',
    method: 'POST',
    data
  });
};
