export const validUser = {
  username: 'testuser',
  password: '123456'
};

export const invalidUser = {
  username: 'wronguser',
  password: '123456'
};

export const newUser = {
  username: 'NguyenThiThuTam',  
  password: '123456',
  confirmpassword: '123456',
  name: 'Tam thu Nhat',
  email: 'NguyenThiThuTam@test.com',
};

export const duplicateUsername = {
  username: 'NguyenThiThuTam',
  password: '123456',
  confirmpassword: '123456',
  name: 'Tam thu Hai',
  email: 'newuser02@test.com'
};
export const notconfirmpassword = {
  username: 'NguyenThiThu_Tam',
  password: '123456',
  confirmpassword: '123465',
  name: 'Tam thu Hai',
  email: 'newuser02@test.com'
};

export const invalidEmailUser = {
  username: 'NguyenThiThu_Tam',
  password: '123456',
  confirmpassword: '123456',
  name: 'Tam thu Hai',
  email: 'invalid-email'
};

