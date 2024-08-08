# Copyright (c) 2024, Gatura Njenga and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import getdate
from frappe.model.document import Document



class InsuranceOrder(Document):
	def validate(self):
		set_days(self)


def set_days(self):
	
	from_date = getdate(self.from_date)
	to_date = getdate(self.to_date)
	self.number_of_days = (to_date - from_date).days
