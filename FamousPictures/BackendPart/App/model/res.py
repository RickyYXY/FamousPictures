class Res:
    status = 200
    msg = ''
    info = []

    def __init__(self, status, msg, info):
        self.status = status
        self.msg = msg
        self.info = info