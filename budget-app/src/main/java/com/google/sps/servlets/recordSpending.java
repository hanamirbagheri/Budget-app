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
@WebServlet("/spending")
public class recordSpending extends HttpServlet {

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Float spending = Float.parseFloat(Jsoup.clean(request.getParameter("text-input"), Safelist.none()));
    String type = Jsoup.clean(request.getParameter("budget-type"), Safelist.none());
    long timestamp = System.currentTimeMillis();

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Spending");
    FullEntity spendingEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("Spending amount", spending)
            .set("Type", type)
            .set("timestamp", timestamp)
            .build();
    datastore.put(spendingEntity);

    response.sendRedirect("recordSpending.html");
  }
}
