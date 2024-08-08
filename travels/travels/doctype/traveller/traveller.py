# Copyright (c) 2024, Gatura Njenga and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from datetime import date


class Traveller(Document):
	# validate
	def validate(self):
		set_full_name(self)
		set_age(self)
		id_length_check(self)
		


def set_full_name(self):
    first_name = self.first_name.strip()
    middle_name = self.middle_name_optional.strip() if self.middle_name_optional else ""
    last_name = self.last_name.strip()
    # if middle name is set
    if middle_name:
        self.full_name = f"{first_name} {middle_name} {last_name}"
    else:
        self.full_name = f"{first_name} {last_name}"
        

def set_age(self):
    # today = date.today()
    # dob = self.date_of_birth
    # age_years = today.year - dob.year
    # age_months = today.month - dob.month
    # age_days = today.day - dob.day
    # if age_months < 0 or (age_months == 0 and age_days < 0):
    #     age_years -= 1
    #     age_months += 12
    # if age_months < 0:
    #     age_months += 12
    # if age_days < 0:
    #     age_months -= 1
    #     age_days += date(today.year, today.month, 0).day
    # self.age = str(age_years) + " years " + str(age_months) + " months " + str(age_days) + " days"
	pass

def id_length_check(self):
	id = self.passport___id_number
	if len(id) != 8:
		frappe.throw("Passport ID must be 8 digits long")