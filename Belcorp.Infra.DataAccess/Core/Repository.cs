//===================================================================================
// Microsoft Developer & Platform Evangelism
//=================================================================================== 
// THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, 
// EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES 
// OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
//===================================================================================
// Copyright (c) Microsoft Corporation.  All Rights Reserved.
// This code is released under the terms of the MS-LPL license, 
// http://microsoftnlayerapp.codeplex.com/license
//===================================================================================


namespace Belcorp.Infra.DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;    
    using Rep.Traserep.Domain.Core;
    using Rep.Traserep.Domain.Core.Specification;
    using Rep.Traserep.Infra.Data.Core.Properties;
    using Rep.Traserep.Infra.CrossCutting.Net.Exceptions;

    /// <summary>
    /// Repository base class
    /// </summary>
    /// <typeparam name="TEntity">The type of underlying entity in this repository</typeparam>
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        #region Members

        readonly IQueryableUnitOfWork _UnitOfWork;
       
        #endregion

        #region Constructor

        /// <summary>
        /// Create a new instance of repository
        /// </summary>
        /// <param name="unitOfWork">Associated Unit Of Work</param>
        public Repository(IQueryableUnitOfWork unitOfWork)
        {
            if (unitOfWork == (IUnitOfWork)null)
                throw new ArgumentNullException("unitOfWork");

            _UnitOfWork = unitOfWork;
        }

        #endregion

        #region IRepository Members        
        public IUnitOfWork UnitOfWork
        {
            get 
            {
                return _UnitOfWork;
            }
        }        
        public virtual void Add(TEntity item)
        {

            if (item != (TEntity)null)
                GetSet().Add(item); // add new item in this set
            else
            {
                ExceptionManager.GenerarAppExcepcionGeneral(Messages.info_CannotAddNullEntity);                
            }

        }

        public virtual void AddReplicate(TEntity item)
        {

            if (item != (TEntity)null)
                _UnitOfWork.Attach<TEntity>(item); // add new item in this set
            else
            {
                ExceptionManager.GenerarAppExcepcionGeneral(Messages.info_CannotAddNullEntity);
            }

        }

        public virtual void Add(List<TEntity> items)
        {

            if (items != (List<TEntity>)null)
            {
                items.ForEach(x => Add(x));
            }
            else
            {
                ExceptionManager.GenerarAppExcepcionGeneral(Messages.info_CannotAddNullEntity);
            }

        }


        public virtual void Remove(TEntity item)
        {
            if (item != (TEntity)null)
            {
                //attach item if not exist
                _UnitOfWork.Attach(item);

                //set as "removed"
                GetSet().Remove(item);
            }
            else
            {
                ExceptionManager.GenerarAppExcepcionGeneral(Messages.info_CannotRemoveNullEntity);
            }
        }
        public virtual void Remove(List<TEntity> items)
        {
            if (items != (List<TEntity>)null)
            {
                items.ForEach(x => Remove(x));
            }
            else
            {
                ExceptionManager.GenerarAppExcepcionGeneral(Messages.info_CannotRemoveNullEntity);
            }
        }
        public virtual void TrackItem(TEntity item)
        {
            if (item != (TEntity)null)
                _UnitOfWork.Attach<TEntity>(item);
            else
            {
                ExceptionManager.GenerarAppExcepcionGeneral(Messages.info_CannotRemoveNullEntity);
            }
        }
        public virtual void Modify(TEntity item)
        {
            if (item != (TEntity)null)                
                _UnitOfWork.SetModified(item);
            else
            {
                ExceptionManager.GenerarAppExcepcionGeneral(Messages.info_CannotModifyNullEntity);
            }
        }
        public virtual TEntity Get(params object[] keyValues)
        {
            return GetEntity(keyValues);
        }
        public virtual TEntity GetAsNoTracking(params object[] keyValues)
        {
            var entity = GetEntity(keyValues);
            if (entity != null)
            {
                ((DbContext)UnitOfWork).Entry(entity).State = EntityState.Detached;                
            }
            return entity;
        }
        private TEntity GetEntity(params object[] keyValues)
        {
            if (keyValues != null)
                return GetSet().Find(keyValues);
            else
                return null;
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return GetSet();
        }
        public virtual IEnumerable<TEntity> GetAllAsNoTracking()
        {
            return GetSet().AsNoTracking();
        }
        public virtual IEnumerable<TEntity> AllMatching(ISpecification<TEntity> specification)
        {
            return GetSet().Where(specification.SatisfiedBy());
        }
        public virtual IEnumerable<TEntity> GetPaged<KProperty>(int pageIndex, int pageCount, System.Linq.Expressions.Expression<Func<TEntity, KProperty>> orderByExpression, bool ascending)
        {
            var set = GetSet();
            return GetPaged(pageIndex, pageCount, orderByExpression, ascending);
        }
        public virtual IEnumerable<TEntity> GetPagedAsNoTracking<KProperty>(int pageIndex, int pageCount, System.Linq.Expressions.Expression<Func<TEntity, KProperty>> orderByExpression, bool ascending)
        {
            var set = GetSet().AsNoTracking();
            return GetPaged(pageIndex, pageCount, orderByExpression, ascending);
        }
        private IEnumerable<TEntity> GetPaged<KProperty>(IQueryable<TEntity> set, int pageIndex, int pageCount, System.Linq.Expressions.Expression<Func<TEntity, KProperty>> orderByExpression, bool ascending)
        {
            if (ascending)
            {
                return set.OrderBy(orderByExpression)
                          .Skip(pageCount * pageIndex)
                          .Take(pageCount);
            }
            else
            {
                return set.OrderByDescending(orderByExpression)
                          .Skip(pageCount * pageIndex)
                          .Take(pageCount);
            }
        }

        public virtual IEnumerable<TEntity> GetFiltered(System.Linq.Expressions.Expression<Func<TEntity, bool>> filter)
        {
            return Filtered(filter);
        }
        public virtual IEnumerable<TEntity> GetFilteredAsNoTracking(System.Linq.Expressions.Expression<Func<TEntity, bool>> filter)
        {
            return Filtered(filter).AsNoTracking();
        }
        private IQueryable<TEntity> Filtered(System.Linq.Expressions.Expression<Func<TEntity, bool>> filter)
        {
            return GetSet().Where(filter);
        }

        public virtual void Merge(TEntity persisted, TEntity current)
        {
            _UnitOfWork.ApplyCurrentValues(persisted, current);
        }

        public void EnabledEntityValidation(bool enabled)
        {
            ((DbContext)UnitOfWork).Configuration.ValidateOnSaveEnabled = enabled;
        }

        #endregion

        #region IDisposable Members
        public void Dispose()
        {
            if (_UnitOfWork != null)
                _UnitOfWork.Dispose();
        }

        #endregion

        #region Private Methods
        IDbSet<TEntity> GetSet()
        {
            return  _UnitOfWork.CreateSet<TEntity>();
        }

        public DbContextTransaction BeginTransaction()
        {
            return _UnitOfWork.BeginTransaction();
        }
        #endregion
    }
}
