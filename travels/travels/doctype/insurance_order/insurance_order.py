# Copyright (c) 2024, Gatura Njenga and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import getdate
from frappe.model.document import Document



class InsuranceOrder(Document):
	def validate(self):
		from_date(self)
		to_date_check(self)
		calculate_days(self)
		calculate_price(self)
       
@frappe.whitelist()
def from_date(self):
    # start_date = getdate(self.from_date)
    # today = getdate()
    # if start_date < today:
    #     return frappe.throw("From date cannot be before today")
    #     # frappe.throw("From date cannot be before today")
    pass


def to_date_check(self):
    # start_date = getdate(self.from_date)
    # end_date = getdate(self.to_date)
    # if end_date < start_date:
    #     frappe.throw("To date cannot be before from date")
	pass



def calculate_days(self):
	# start_date = getdate(self.from_date)
	# end_date = getdate(self.to_date)
	# delta = end_date - start_date
	# days = delta.days + 1
	# self.days = days
    pass



def calculate_price(self):
    # doc = frappe.get_doc("Pricing", "PR-2024-08-08-08")
    # price = doc.price
    # self.amount = price * self.days
    pass
    
