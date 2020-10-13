import datetime
import random

from qiniu import Auth, put_file

from App.setting import BASE_URL

__author__ = 'lyy'


# 获取当前时间
def get_date_now():
    return str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))


# 用时间生成一个唯一随机数
def get_ran_dom():
    now_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")  # 生成当前时间
    random_num = random.randint(0, 100)  # 生成的随机整数n，其中0<=n<=100
    if random_num <= 10:
        random_num = str(0) + str(random_num)
    unique_num = str(now_time) + str(random_num)
    return unique_num


# 将生成的图片上传到七牛云
# 传入filename和filepath，返回图片的URL
def upload_pic_to_qiniu(filename, filepath):
    from App.secure import QINIU_AK
    from App.secure import QINIU_SK

    access_key = QINIU_AK
    secret_key = QINIU_SK

    q = Auth(access_key, secret_key)

    # 要上传的空间
    bucket_name = 'ytools'

    # 生成上传 Token，可以指定过期时间等
    token = q.upload_token(bucket_name, filename, 3600)

    ret, info = put_file(token, filename, filepath)
    return BASE_URL + ret['key']


# 获取图片路径
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()