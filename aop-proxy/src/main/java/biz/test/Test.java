package biz.test;

import biz.UserMgr;
import biz.impl.UserMgrImpl;
import biz.proxy.DynamicProxy;

/**
 * create by Lfm
 * on 2018-08-08 21:05
 */
public class Test {
    public static void main(String[] args){
        UserMgr userMgr=(UserMgr)new DynamicProxy().bind(new UserMgrImpl());
        userMgr.delUser();
    }
}
