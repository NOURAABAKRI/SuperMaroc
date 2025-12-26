package com.SuperMaroc.controller;

import com.SuperMaroc.config.JpaConfig;
import com.SuperMaroc.model.Produit;
import com.SuperMaroc.service.ProduitService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ProduitController.class,
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = JpaConfig.class))
public class ProduitControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProduitService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAll() throws Exception {
        Produit p1 = new Produit();
        p1.setId(1L);
        p1.setNom("Produit 1");
        
        Produit p2 = new Produit();
        p2.setId(2L);
        p2.setNom("Produit 2");

        List<Produit> produits = Arrays.asList(p1, p2);

        when(service.getAll()).thenReturn(produits);

        mockMvc.perform(get("/api/produits"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nom").value("Produit 1"));
    }

    @Test
    public void testGetById() throws Exception {
        Produit p = new Produit();
        p.setId(1L);
        p.setNom("Produit 1");

        when(service.get(1L)).thenReturn(p);

        mockMvc.perform(get("/api/produits/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nom").value("Produit 1"));
    }

    @Test
    public void testAdd() throws Exception {
        Produit p = new Produit();
        p.setNom("Nouveau Produit");

        Produit saved = new Produit();
        saved.setId(1L);
        saved.setNom("Nouveau Produit");

        when(service.save(any(Produit.class))).thenReturn(saved);

        mockMvc.perform(post("/api/produits")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nom").value("Nouveau Produit"));
    }

    @Test
    public void testUpdate() throws Exception {
        Produit p = new Produit();
        p.setNom("Produit Modifie");

        Produit updated = new Produit();
        updated.setId(1L);
        updated.setNom("Produit Modifie");

        when(service.update(eq(1L), any(Produit.class))).thenReturn(updated);

        mockMvc.perform(put("/api/produits/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("Produit Modifie"));
    }

    @Test
    public void testDelete() throws Exception {
        mockMvc.perform(delete("/api/produits/1"))
                .andExpect(status().isOk());
    }
}
