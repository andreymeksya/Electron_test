from tornado.web import Application, RequestHandler
from tornado.ioloop import IOLoop
import requests
import xmltodict
import asyncio
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

class BaseHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')

    def options(self, *args, **kwargs):
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', '*')
        self.set_status(204)
        self.finish()


class MoneyHandler(BaseHandler):
    def get(self):
        response = requests.request('GET','http://www.cbr.ru/scripts/XML_daily.asp')
        data = xmltodict.parse(response.content)
        return_data = {
            'USD': data['ValCurs']['Valute'][10]['Value'],
            'EUR': data['ValCurs']['Valute'][11]['Value'],
            'JPY': data['ValCurs']['Valute'][33]['Value'],
            'GBP': data['ValCurs']['Valute'][2]['Value'],
        }
        self.write(return_data)

def make_app():
    urls = [("/", MoneyHandler)]
    return Application(urls)


if __name__ == '__main__':
    app = make_app()
    app.listen(8000)
    IOLoop.instance().start()