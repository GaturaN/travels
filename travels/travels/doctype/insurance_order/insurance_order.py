# Copyright (c) 2024, Gatura Njenga and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import getdate
from frappe.model.document import Document



class InsuranceOrder(Document):
	def validate(self):
		check_dates(self)
		set_days(self)

def check_dates(self):
    """
    Validates the dates of the InsuranceOrder document.

    Raises:
        frappe.ValidationError: If the 'to_date' is before the 'from_date' or if the 'from_date' is not provided.
    """
    from_date = self.from_date
    to_date = self.to_date

    if from_date and to_date < from_date:
        frappe.throw("'To Date' should be after 'From Date'")
    elif not from_date:
        frappe.throw("Please provide 'From Date'")

def set_days(self):
	
	from_date = getdate(self.from_date)
	to_date = getdate(self.to_date)
	self.number_of_days = (to_date - from_date).days
