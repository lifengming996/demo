package biz.proxy;


import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * create by Lfm
 * on 2018-08-08 20:52
 */
public class DynamicProxy implements  InvocationHandler {
    Object delegate;
    Logger logger=Logger.getLogger(this.getClass().getName());

    public Object bind(Object delegate){
        this.delegate = delegate;
        Class cls=delegate.getClass();
        return Proxy.newProxyInstance(cls.getClassLoader(),cls.getInterfaces(),this);
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        logger.log(Level.INFO,"befor -----------");
        Object retvalue=method.invoke(delegate,args);
        logger.log(Level.INFO,"after -----------");
        return null;
    }
}
