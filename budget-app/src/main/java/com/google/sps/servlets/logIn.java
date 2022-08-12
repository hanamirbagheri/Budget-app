package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import com.google.sps.data.Money;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Handles requests sent to the /hello URL. Try running a server and navigating to /hello! */
@WebServlet("/login")
public class logIn extends HttpServlet {

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String enteredUsername = Jsoup.clean(request.getParameter("text-input-username"), Safelist.none());
    String enteredPassword = Jsoup.clean(request.getParameter("text-input-password"), Safelist.none());

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("account").build();
    QueryResults<Entity> results = datastore.run(query);

    boolean success = false;
    String username = "";
    String password = "";
    while (results.hasNext()) {
        Entity entity = results.next();
        username = entity.getString("username");
        password = entity.getString("password");
        System.out.println(username);
        System.out.println(password);
        if (username.equals(enteredUsername) && password.equals(enteredPassword)) {
            success=true;
            break;
        } 
    }
    if (success) {
        response.sendRedirect("profile.html");
    } else {
        response.sendRedirect("index.html");
    }
    
  }
}
