import request from 'utils/request';
export const getList = async () => {
    try {
        const res = await request.get('Customer/GetListWithFilter');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
