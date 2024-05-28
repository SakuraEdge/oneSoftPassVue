

const dao = `package com.eternal.oneSoftPass.dao.user;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.eternal.oneSoftPass.bean.SignInfoBean;
import com.eternal.oneSoftPass.bean.UserBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface IUserDAO extends BaseMapper <<UserBean>>{

}`

function getCodeBean(packageName,tableName){
    if (tableName === "osp_user") {
        return `package ${packageName}.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("osp_user")
public class UserBean {
    @TableId(value = "U_ID",type = IdType.AUTO)
    private String U_ID;
    private String NAME;
    private String TEL;
    private String EMAIL;
    private String PASSWORD;
    private String DESCRIPTION;
    private String LOGIN_TIME;
    private String exp;
    private String CREATE_TIME;
    private String STATE;
    private String LEVEL;
}
`
    }
    else if (tableName === "approve_log") {
        return `package ${packageName}.bean;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("bs_para_detail")
public class BsParaBean {
    private String PARA_TYPE;
    private String PARA_CODE;
    private String PARA_NAME;
    private String PARA1;
    private String PARA2;
    private String PARA3;
    private String PARA4;
    private String PARA5;
    private String PARA_DESC;
    private String STATE;
    private String CREATE_TIME;
    private String UPDATE_TIME;
    private String REMARKS;
}
`
    }
    else if (tableName === "osp_exchange") {
        return `package ${packageName}.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("osp_exchange")
public class ExChangeBean {
    @TableId(value = "id",type = IdType.AUTO)
    private String id;
    private String name;
    private String hui_in;
    private String hui_out;
    private String chao_in;
    private String chao_out;
    private String code;
    private String zhesuan;
    private String day;
    private String time;
}`
    }

}

function getCodeDAO(packageName,tableName){

    let parts = tableName.split('_').map(function(word) {
        // 将每个单词的首字母转换为大写
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const name = parts.join('');

    return `package ${packageName}.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.eternal.oneSoftPass.bean.DataSourceBean;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface I${name}DAO extends BaseMapper<${name}Bean> {

}`

}

function getCodeController(packageName,tableName) {

    let parts = tableName.split('_').map(function(word) {
        // 将每个单词的首字母转换为大写
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const name = parts.join('');

    let nameDown = name.charAt(0).toLowerCase() + name.slice(1);
    nameDown = parts.join('');


    return `package ${packageName}.controller;

import ${packageName}.bean.${name}Bean;
import ${packageName}.service.I${name}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/${nameDown}")
public class DemoController {

    @Autowired
    I${name}Service ${nameDown}Service;

    @PostMapping ("/add")
    public void add(@RequestBody Map<String,String> param){
        ${nameDown}Service.add(param);
    }

    @PostMapping ("/edit")
    public void edit(@RequestBody Map<String,String> param){
        ${nameDown}Service.edit(param);
    }
    
    @PostMapping("/get")
    public DemoBean get(@RequestBody Map<String,String> param){
        DemoBean bean = ${nameDown}Service.get(param.get("id"));
        return bean;
    }

    @PostMapping("/delete")
    public void delete(@RequestBody Map<String,String> param){
        ${nameDown}Service.delete(param.get("id"));
    }
    
}
`

}

function getCodeService(packageName,tableName) {

    let parts = tableName.split('_').map(function(word) {
        // 将每个单词的首字母转换为大写
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const name = parts.join('');

    return `package ${packageName}.service;

import ${packageName}.bean.${name}Bean;

import java.util.Map;

public interface I${name}Service {
    void add(Map<String, String> param);
    void edit(Map<String, String> param);
    void delete(String id);
    ${name}Bean get(String id);
}
`
}

function getCodeServiceImpl(packageName,tableName) {

    let parts = tableName.split('_').map(function(word) {
        // 将每个单词的首字母转换为大写
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const name = parts.join('');

    let nameDown = name.charAt(0).toLowerCase() + name.slice(1);
    nameDown = parts.join('');

    return `package ${packageName}.service.impl;

import ${packageName}.dao.I${name}DAO;
import ${packageName}.service.I${name}Service;
import ${packageName}.bean.${name}Bean;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public class ${name}ServiceImpl implements I${name}Service {

    @Autowired
    private I${name}DAO ${nameDown}DAO;

    @Override
    public void add(Map<String, String> param) {
        ${nameDown}DAO.insert((${name}Bean) param);
    }

    @Override
    public void edit(Map<String, String> param) {
        ${nameDown}DAO.updateById((${name}Bean) param);
    }

    @Override
    public void delete(String id) {
        ${nameDown}DAO.deleteById(id);
    }

    @Override
    public ${name}Bean get(String id) {
        return ${nameDown}DAO.selectById(id);;
    }
}
`
}



export default {
    getCodeBean,
    getCodeDAO,
    getCodeController,
    getCodeService,
    getCodeServiceImpl,
}
