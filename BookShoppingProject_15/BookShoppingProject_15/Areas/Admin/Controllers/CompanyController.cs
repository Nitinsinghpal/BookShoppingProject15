﻿using BookShoppingProject.DataAccess.Repository.IRepository;
using BookShoppingProject.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShoppingProject_15.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class CompanyController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        public CompanyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Upsert(int? id)
        {
            Company company = new Company();
            if (id == null)
                return View(company);
            company = _unitOfWork.Company.Get(id.GetValueOrDefault());
            return View(company);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert(Company company)
        {
            if (company == null)
                return NotFound();
            if (!ModelState.IsValid)
                return View(company);
            if (company.Id == 0)
                _unitOfWork.Company.Add(company);
            else
                _unitOfWork.Company.Update(company);
            _unitOfWork.Save();
            return RedirectToAction(nameof(Index));
        }


        #region APIs
        [HttpGet]
        public IActionResult GetAll()
        {
            return Json(new { data = _unitOfWork.Company.GetAll() });
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var CompanyInDb = _unitOfWork.Company.Get(id);
            if (CompanyInDb == null)
                return Json(new { success = false, message = "Error while deleting data!!" });
            _unitOfWork.Company.Remove(CompanyInDb);
            _unitOfWork.Save();
            return Json(new { success = true, message = " data deleted successfully!!" });

        }

        #endregion
    }
}
