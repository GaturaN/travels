// Copyright (c) 2024, Gatura Njenga and contributors
// For license information, please see license.txt

frappe.ui.form.on("Insurance Order", {
  refresh(frm) {
    if (!frm.doc.from_date) {
      frm.toggle_display("to_date", false);
    } else {
      frm.toggle_display("to_date", true);
    }
    if (frm.doc.category === "Individual") {
      frm.toggle_display("beneficiaries", false);
      frm.set_value("number_of_beneficiaries", 1);
    } else {
      frm.toggle_display("beneficiaries", true);
    }
  },

  from_date: function (frm) {
    let fromDate = new Date(frm.doc.from_date);
    let today = new Date();
    if (fromDate < today) {
      frappe.msgprint({
        title: "Warning",
        message: "From Date has to be after today",
        indicator: "red",
      });
      frm.set_value("from_date", "");
      // frm.refresh();
    }
    if (frm.doc.from_date) {
      frm.toggle_display("to_date", true);
    } else {
      frm.toggle_display("to_date", false);
    }
  },

  to_date: function (frm) {
    if (frm.doc.from_date) {
      let toDate = new Date(frm.doc.to_date);
      let fromDate = new Date(frm.doc.from_date);
      if (toDate < fromDate) {
        frappe.msgprint({
          title: "Warning",
          message: "To date has to be after From Date",
          indicator: "red",
        });
        frm.set_value("to_date", "");
      }
    }

    if (frm.doc.from_date && frm.doc.to_date) {
      diffInMs = new Date(frm.doc.to_date) - new Date(frm.doc.from_date);
      diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
      frm.set_value("days", diffInDays);
    }
  },

  // days: function (frm) {
  //   if (frm.doc.days) {
  //     let price = frm.doc.order_price;
  //     let days = frm.doc.days;
  //     frm.set_value("amount", price * days);
  //   }
  // },

  category: function (frm) {
    if (frm.doc.category === "Individual") {
      // clear the beneficiary section
      frm.clear_table("beneficiaries");
      frm.toggle_display("beneficiaries", false);
      frm.set_value("number_of_beneficiaries", 1);
    } else {
      frm.toggle_display("beneficiaries", true);
    }

    // if category is != individuals, set the beneficiaries as mandatory
    if (frm.doc.category !== "Individual") {
      frm.set_df_property("beneficiaries", "reqd", 1);
    } else {
      frm.set_df_property("beneficiaries", "reqd", 0);
    }
  },

  number_of_beneficiaries(frm){
    if (frm.doc.number_of_beneficiaries) {
      let price = frm.doc.order_price;
      let days = frm.doc.days;
      let number_of_beneficiaries = frm.doc.number_of_beneficiaries;
      frm.set_value("amount", price * days * number_of_beneficiaries);
    }
  }
});

// This section is used to calculate the number of beneficiaries in the order.
// Beneficiaries are added in the child-table while the main owner is placed in the parent table.
// We have to make sure beneficiaries selected are unique and none of which is the main owner of the order.
// This can be done by creating an empty list and adding the beneficiaries in the list while checking if the beneficiary is already in the list.

frappe.ui.form.on("Insurance Beneficiaries", {
  full_name(frm, cdt, cdn) {
    console.log("Full Name Changed");
    let data = [];
    data.push(frm.doc.customer);

    // iterate the childtable and get all the full names
    for (let beneficiary of frm.doc.beneficiaries) {
      // before adding to list, confirm that beneficiary name is not in the list
      if (!data.includes(beneficiary.beneficiary_name)) {
        data.push(beneficiary.beneficiary_name);
      } else {
        // clear the row
        frappe.show_alert("Beneficiary name already exists in the list");
        
        frappe.model.set_value(cdt,cdn,"full_name","");
      }
    }
    console.log(data);
    // set the number of beneficiaries
    r = data.length;
    frm.set_value("number_of_beneficiaries", r);
  },
});
