package com.SuperMaroc.service;

import com.SuperMaroc.model.Produit;
import com.SuperMaroc.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {
    
    
    private final ProduitRepository produitRepository;

    
    @Autowired
    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    
    public List<Produit> getAll() {
        return produitRepository.findAll();
    }

    public Produit get(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec ID: " + id));
    }

    public Produit save(Produit p) {
        return produitRepository.save(p);
    }

    public Produit update(Long id, Produit p) {
        // Vérifie d'abord si le produit existe
        Produit existingProduit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec ID: " + id));
        
        // Met à jour seulement les champs fournis
        if (p.getNom() != null) {
            existingProduit.setNom(p.getNom());
        }
        if (p.getDescription() != null) {
            existingProduit.setDescription(p.getDescription());
        }
        if (p.getPrix() != 0) {
            existingProduit.setPrix(p.getPrix());
        }
        if (p.getStock() != 0) {
            existingProduit.setStock(p.getStock());
        }
        if (p.getMagasin() != null) {
            existingProduit.setMagasin(p.getMagasin());
        }
        
        return produitRepository.save(existingProduit);
    }

    public void delete(Long id) {
        if (!produitRepository.existsById(id)) {
            throw new RuntimeException("Produit non trouvé avec ID: " + id);
        }
        produitRepository.deleteById(id);
    }
}