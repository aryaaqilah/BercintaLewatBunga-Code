import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

const FloristSidebar = () => {
  const { logout } = useContext(AuthContext);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // --- LOGIKA DATA ---
  const [allProducts] = useState(Array.from({ length: 96 }, (_, i) => ({
    name: `Buket Lili ${i + 1}`,
    image: 'BuketLili.png',
    description: 'Lili, indah seperti parasnya,......',
    stock: 100
  })));

  const [currentPage, setCurrentPage] = useState(3);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  
  const currentProducts = allProducts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // --- STYLES ---
  const styles = {
    container: { padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'sans-serif', color: '#333' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '32px', color: '#8d5d4a', margin: 0, fontFamily: 'serif' },
    searchWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    searchInput: { padding: '8px 12px 8px 35px', borderRadius: '6px', border: '1px solid #ddd', width: '250px', outline: 'none' },
    tableCard: { backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { padding: '15px', borderBottom: '1px solid #eee', color: '#666', fontWeight: '500', backgroundColor: '#fafafa' },
    td: { padding: '15px', borderBottom: '1px solid #f0f0f0', fontSize: '14px' },
    footer: { marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    
    // Pagination Styles Persis Foto
    paginationWrapper: { display: 'flex', gap: '20px', alignItems: 'center', color: '#5e6771', userSelect: 'none' },
    pageNumber: { cursor: 'pointer', fontSize: '16px', transition: '0.2s' },
    activeBox: { 
      border: '1.5px solid #d1d5db', 
      borderRadius: '8px', 
      padding: '8px 12px', 
      color: '#374151',
      fontWeight: '500'
    },
    arrow: { cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', padding: '0 10px' },
    
    btnGroup: { display: 'flex', gap: '15px' },
    btnHapus: { padding: '12px 40px', backgroundColor: '#434d4d', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' },
    btnTambah: { padding: '12px 40px', backgroundColor: '#a6624f', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' },
    iconBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#888', marginLeft: '10px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Produk</h1>
        <div style={styles.searchWrapper}>
          <span style={{ position: 'absolute', left: '12px', color: '#999' }}>🔍</span>
          <input type="text" placeholder="Cari" style={styles.searchInput} />
        </div>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}><input type="checkbox" /></th>
              <th style={styles.th}>Produk</th>
              <th style={styles.th}>Gambar</th>
              <th style={styles.th}>Deskripsi</th>
              <th style={styles.th}>Stok</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}><input type="checkbox" /></td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}><code style={{fontSize:'12px'}}>{item.image}</code></td>
                <td style={{...styles.td, color: '#666'}}>{item.description}</td>
                <td style={styles.td}>{item.stock}</td>
                <td style={{...styles.td, textAlign: 'right'}}>
                  <button style={styles.iconBtn}>🗑️</button>
                  <button style={styles.iconBtn}>📝</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.footer}>
        {/* Pagination Style Baru */}
        <div style={styles.paginationWrapper}>
          <div style={styles.arrow} onClick={() => goToPage(currentPage - 1)}>❮</div>
          
          {[1, 2].map(num => (
            <div 
              key={num} 
              style={styles.pageNumber} 
              onClick={() => goToPage(num)}
            >
              0{num}
            </div>
          ))}

          {/* Halaman Aktif dengan Kotak */}
          <div style={styles.activeBox}>
            {currentPage < 10 ? `0${currentPage}` : currentPage}
          </div>

          <div style={styles.pageNumber} onClick={() => goToPage(4)}>04</div>
          <div style={{color: '#999'}}>...</div>
          <div style={styles.pageNumber} onClick={() => goToPage(12)}>12</div>

          <div style={styles.arrow} onClick={() => goToPage(currentPage + 1)}>❯</div>
        </div>

        <div style={styles.btnGroup}>
          <button style={styles.btnHapus}>Hapus</button>
          <button style={styles.btnTambah}>Tambah</button>
        </div>
      </div>
    </div>
  );
};

export default FloristSidebar;