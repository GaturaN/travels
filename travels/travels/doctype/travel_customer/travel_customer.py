# Copyright (c) 2024, Gatura Njenga and contributors
# For license information, please see license.txt

import frappe
# import dateutil
from frappe.model.document import Document


class TravelCustomer(Document):

	def validate(self):
		first_name = self.first_name.strip().title()
		last_name = self.last_name.strip().title()
		self.first_name = first_name
		self.last_name = last_name
		self.full_name = f"{first_name} {last_name}"
  
		if self.middle_name_optional:
			self.middle_name_optional= self.middle_name_optional.strip().title()
    