# dialect+driver://username:password@host:port/database
# DIALECT = 'mysql'  # 要用的什么数据库
# DRIVER = 'pymysql'  # 连接数据库驱动
# USERNAME = 'xxx'  # 用户名
# PASSWORD = 'xxx'  # 密码
# HOST = 'localhost'  # 服务器
# PORT = '3306'  # 端口
# DATABASE = 'xxx'  # 数据库名
#
# SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(DIALECT, DRIVER, USERNAME, PASSWORD, HOST, PORT,
#                                                                        DATABASE)
# SQLALCHEMY_TRACK_MODIFICATIONS = False

QINIU_AK = '更换成你们的ak'  # 七牛云存储的 ak
QINIU_SK = '更换成你们的sk'  # 七牛云存储的 sk