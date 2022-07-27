package com.google.sps.servlets;
 
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
 
/** Handles requests sent to the /hello URL. Try running a server and navigating to /hello! */
@WebServlet("/income")
public class recordIncome extends HttpServlet {
 
 public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
   Float income = Float.parseFloat(Jsoup.clean(request.getParameter("text-input-income"), Safelist.none()));
   long timestamp = System.currentTimeMillis();
 
   Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
   KeyFactory keyFactory = datastore.newKeyFactory().setKind("Income");
   FullEntity taskEntity =
       Entity.newBuilder(keyFactory.newKey())
           .set("Income amount", income)
           .set("timestamp", timestamp)
           .build();
   datastore.put(taskEntity);
 
   response.sendRedirect("recordIncome.html");
 }
}
